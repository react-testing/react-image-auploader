import { lazy, Suspense, memo } from "react";
import { withErrorBoundary } from "react-error-boundary";

import ImageLoader from "../../Loaders/ImageLoader";
import Loader from "../../Loaders/loader";
import ThereNotImages from "../../../Images/there_not_image.svg";
import useImagesGlobal from "../../Hooks/HooksStore/useImages";
import ImageListError from "../ErrorBoundaries/ImageListError";
const ImagePostLazy = lazy(() => import("../ImagePost/ImagePost"));

function ImageList({ images: imagesToShow }) {
  const { data, foundSearches, isLoading, isError } = useImagesGlobal().images;
  const isFoundSearches = foundSearches?.length > 0;

  const joinFoundWithImagesShow = foundSearches?.filter((img) => {
    return imagesToShow?.some((imgs2) => imgs2._id === img._id);
  });
  const imagesToShowFound =
    isFoundSearches && imagesToShow ? joinFoundWithImagesShow : imagesToShow;
  const images = imagesToShowFound || (isFoundSearches ? foundSearches : data);

  if (isError) return <ImageListError />;
  if (isLoading) return <Loader />;
  if (!data.length) {
    return (
      <div className="there-dont-images">
        <img src={ThereNotImages} alt="No hay publicaciones para mostrar :(" />
        <h2>No hay publicaciones para mostrar</h2>
      </div>
    );
  }

  return (
    <section className="massory">
      {images.map((img) => (
        <Suspense fallback={<ImageLoader />} key={img._id}>
          <ImagePostLazy {...img} />
        </Suspense>
      ))}
    </section>
  );
}

export default memo(
  withErrorBoundary(ImageList, { FallbackComponent: ImageListError })
);
