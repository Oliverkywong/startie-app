import { IonContent, IonItem, IonPage } from "@ionic/react";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const ImageCropDialogForUser = ({
  imageUrl,
  onCancel,
  setCroppedImageFor,
}: {
  imageUrl: string | ArrayBuffer | null;
  onCancel: () => void;
  setCroppedImageFor: (result: string) => void;
}) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(croppedImageUrl);
  };

  return (
    <IonPage>
      <IonContent>
        {typeof imageUrl === "string" && (
          <Cropper
            image={imageUrl}
            zoom={zoom}
            crop={crop}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}
        <IonItem>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onCrop}>Crop</button>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ImageCropDialogForUser;
