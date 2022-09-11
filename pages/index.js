import { useState } from "react";
import Image from "next/image";
import Cropper from 'react-easy-crop'
import styles from "../styles/Home.module.scss";
import getCroppedImg from "./cropImage";
const Home = () => {

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [file, setFile]= useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [openCrop, setOpenCrop] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea,croppedAreaPixels) => {
       setCroppedAreaPixels(croppedAreaPixels);
  }


  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        uploadPhoto,
        croppedAreaPixels,
      );

      setFile(file);
     setOpenCrop(false);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <form action="">
          <div className={styles.uploadPhoto}>
            <h3 >Profile photo</h3>
            <p>Add or change the current profile photo</p>
            <div className={styles.btn}>
              <label htmlFor="uploadPhoto">Add photo</label>
            </div>
            <input
              type="file"
              id="uploadPhoto"
              className={styles.inpoutUpload}
              placeholder="Upload"
         /*      onClick={() =>{
                setFile(null)
              }} */
              onChange={(e) => {
                if(e.target.files[0]){
                  const image = URL.createObjectURL(e.target.files[0]);
                  setUploadPhoto(image);
                  setOpenCrop(true)
                  setFile(null)
                }
              }}
            />
            <div className={styles.image} >
              {uploadPhoto && openCrop ? (
                <div className={styles.dragandmatch}   style={{pointerEvents: "stroke"}}>
                  <Image
                    src={"/Group 2646.png"}
                    alt="icon"
                    width={20}
                    height={20}
                  
                  />
                  <span>drag and match</span>
                </div>
              ) : null}
              <div
                style={{
                  height: "360px",
                  width: "360px",
                }}
              >
                
       
                  {uploadPhoto && openCrop ? (
                    <Cropper
      image={uploadPhoto}
      crop={crop}
      zoom={zoom}
      aspect={4 / 4}
      cropShape="round"
      maxZoom={3}
      zoomSpeed={100}
      showGrid={false}
      objectFit="vertical-cover"
      cropSize={{width:340, height:340}}
      onCropChange={setCrop}
      style={{cropAreaStyle:{color:"rgba(255, 255, 255, 0.6)"}}}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />)
                   :file ?  <div className={styles.savedImage}>
                    <Image src={file ? URL.createObjectURL(file) : ""} width={360} height={360}  alt={"save image"}/>
                   </div> : null}
              </div>
            </div>
            <div className={styles.inputRange}>
              <span
                onClick={() => {
                  if (zoom < 1.1) {
                    setZoom(1);
                  } else setZoom((prev) => prev - 0.1);
                }}
              >
                -
              </span>
              <input
                id="ranger"
                type="range"
                min="10"
                max="100"
                value={zoom*10}
                className={styles.thumb}
                onChange={(e) => {
                  const { value } = e.target;
                  if(!file){
                    setZoom(+value/10);
                  }
                }}
              />
              <span
                onClick={() => {
                  if (zoom > 9) {
                    setSize(10);
                  } else setZoom((prev) => prev + 0.1);
                }}
              >
                +
              </span>
            </div>
            <div className={styles.btns}>
              <p onClick={() =>{
                window.location.reload()
              }}>cancel</p>
              <p onClick={() =>{
                if(!file){
                  cropImage() 
                }
                }}>save changes</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
