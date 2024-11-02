import React from "react";

const ImageComponent = (props) => {
    const { record } = props;
    const imageUrl =
        "/get-image" +
        record?.params?.frontNationalIdImagePath.split("uploads")[1];

    return (
        <div>
            <p>Front National Id Image Path</p>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Image"
                    style={{
                        width: "200px",
                        borderRadius: "4px",
                    }}
                />
            ) : (
                <span>No Image</span>
            )}
        </div>
    );
};

export default ImageComponent;