import React from "react";
import useAuth from "../../auth/use-auth";

export default function ImageUpload({ image, setImage, path, type }) {
  const { uploadImage } = useAuth();
  return (
    <div className="file has-name is-boxed">
      <label className="file-label">
        <input
          className="file-input"
          onChange={e => setImage(e.target.files[0])}
          type="file"
          name="resume"
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">Choose a file…</span>
        </span>
        <span className="file-name">{image.name}</span>
      </label>
      <input
        value="Press To Upload"
        onClick={() => {
          uploadImage(image, path, type);
        }}
        type="button"
        className="Button"
      />
    </div>
  );
}
