import useComments from "../../Hooks/Comments/useComments";
import ModalImageComments from "./Components/ModalImageComments";
import BtnLoader from "../../Elements/BtnLoader";
import ErrorText from "../../Elements/ErrorText";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
import placeholder from "../../../Images/image_post_loading.gif";
import { toFormData } from "../../../Helpers/utils";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Form, Badge, Dropdown, Button, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import useImageDelete from "../../Hooks/useImageDelete";
import useUpdateImage from "../../Hooks/useUpdateImage";
import useImages from "../../Hooks/HooksStore/useImages";
import TagsInput from "react-tagsinput";
import useToggle from "../../Hooks/useToggle";
import useCurrentUser from "../../Hooks/useCurrentUser";

function ModalImage({ _id, src, tags, title, commentsImage, user: userPost }) {
  const { user } = useCurrentUser();
  const [validated, setValidated] = useState(false);
  const [updateTags, setUpdateTags] = useState(tags);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [isEditingMode, toggleEditingMode] = useToggle();

  const { comments, addComment, createCommentImage, ...imagesProps } =
    useComments(commentsImage);
  const deleteImageMutation = useImageDelete();
  const updateImageMutation = useUpdateImage();
  const { removeImage, updateImage } = useImages();
  const srcLazy = useLazyloadImage({ src, placeholder });

  function handleOnChangeTag(tag) {
    setUpdateTags(tag);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return setValidated(true);
    setValidated(false);
    const fd = toFormData(e.target, {
      image_id: _id,
    });
    const comment = await createCommentImage.mutateAsync(fd);
    addComment(comment, _id);
    e.target.reset();
  };

  const removeComment = (commentId) => {
    return imagesProps.removeComment(_id, commentId);
  };

  const editComment = (commentId, commentContent) => {
    return imagesProps.editComment({ imageId: _id, commentId, commentContent });
  };

  const _removeImage = async () => {
    await deleteImageMutation.mutateAsync(_id);
    removeImage(_id);
  };

  const _updateImage = async () => {
    await updateImageMutation.mutateAsync({
      id: _id,
      title: updateTitle,
      tags: updateTags,
    });
    updateImage({ imageId: _id, title: updateTitle, tags: updateTags });
    toggleEditingMode();
  };

  return (
    <>
      {isEditingMode ? (
        <FormControl
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          size="lg"
          className="my-2"
          style={{ maxWidth: "90%" }}
          title={title}
          placeholder="Escribe el nuevo título..."
          disabled={updateImageMutation.isLoading}
          autoFocus
        />
      ) : (
        <h3 className="title" style={{ maxWidth: "92%" }}>
          {title}
        </h3>
      )}

      <img src={srcLazy} className="modal-img" alt="Preview" />
      <div className="tags">
        {isEditingMode ? (
          <TagsInput
            value={updateTags}
            onChange={handleOnChangeTag}
            className="bg-transparent border rounded-sm px-1 form-tags"
            disabled={updateImageMutation.isLoading}
          />
        ) : (
          tags.map((tag, i) => {
            return (
              <Badge variant="dark" className="mr-1 font-weight-light" key={i}>
                {tag}
              </Badge>
            );
          })
        )}
      </div>

      {isEditingMode && (
        <div className="d-flex mt-2">
          <BtnLoader
            size="sm"
            variant="outline-success"
            className="mr-2"
            text="Guardar edición"
            isLoading={updateImageMutation.isLoading}
            onClick={_updateImage}
          />
          <Button
            size="sm"
            variant="outline-danger"
            onClick={toggleEditingMode}
          >
            Cancelar edición
          </Button>
        </div>
      )}
      <ErrorText
        className="mt-2 mb-0"
        isVisible={updateImageMutation.isError}
        text="Error al editar la publicación"
      />
      <div className="d-flex align-items-center justify-content-between mt-1">
        <small className="d-block text-muted">
          Publicado por
          <Link
            to={`/perfil/${userPost._id}`}
            className="ml-1 text-reset font-weight-bold"
          >
            {userPost.name}
          </Link>
        </small>

        {userPost._id === user._id && (
          <Dropdown>
            <Dropdown.Toggle
              className="p-0 justify-content-end dropdown-image-modal-toggle"
              drop="start"
              variant="link"
              size="lg"
            >
              <BiDotsVerticalRounded />
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="border-0"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <Dropdown.Item
                as={BtnLoader}
                isLoading={updateImageMutation.isLoading}
                className="text-white dropdown-modal-image-item"
                onClick={toggleEditingMode}
              >
                {isEditingMode ? "Cancelar edición" : "Editar publicación"}
              </Dropdown.Item>

              <Dropdown.Item
                as={BtnLoader}
                variant="link"
                isLoading={deleteImageMutation.isLoading}
                className="text-white dropdown-modal-image-item"
                onClick={_removeImage}
              >
                Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <ErrorText
        isVisible={deleteImageMutation.isError}
        text="Error al eliminar la publicación"
      />
      <hr />
      <h5 className="mb-3">
        Deja un comentario
        {comments.length > 0 && <span> {`(${comments.length})`} </span>}
      </h5>
      <Form
        autoComplete="off"
        validated={validated}
        noValidate
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            name="content"
            rows="4"
            size="sm"
            placeholder="¡Di lo que opinas!"
            disabled={createCommentImage.isLoading}
            required
          />
        </Form.Group>

        <ErrorText
          text="Ocurrió un error al comentar"
          isVisible={createCommentImage.isError}
        />
        <BtnLoader
          text="Comentar"
          isLoading={createCommentImage.isLoading}
          variant="success"
          block
        />
      </Form>
      <ModalImageComments {...{ comments, removeComment, editComment }} />
    </>
  );
}

ModalImage.propTypes = {
  _id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  commentsImage: PropTypes.array.isRequired,
};

export default ModalImage;
