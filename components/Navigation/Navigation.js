import FilesList from "../FilesList/FilesList";
import { useSelector, useDispatch } from "react-redux";
import { selectFileData, saveFile, deleteFile, updateFile, clearFileData } from "../../context/fileDataSlice";
import { selectMenuState, toggleNav, closeNav, selectPreviewState, togglePreview } from "../../context/navSlice";
import { fetchAllFiles, selectAllFiles } from "../../context/filesListSlice";
import TrashCan from "../Icons/TrashCanIcon";
import SaveIcon from "../Icons/SaveIcon";
import Hamburger from "hamburger-react";
import DocIcon from "../Icons/DocIcon";
import EyeIcon from "../Icons/EyeIcon";
import EyeOffIcon from "../Icons/EyeOffIcon";
import { useEffect, useRef, useState } from "react";

export default function Navigation() {
    // for put and post method state: )!
    const filesList = useSelector(selectAllFiles) || [];
    const inputNameRef = useRef('')
    const dispatch = useDispatch()
    const { fileName, fileContent } = useSelector(selectFileData)
    const isOpen = useSelector(selectMenuState)
    const isPreviewOpen = useSelector(selectPreviewState);

    const toggleHandler = () => {
      dispatch(toggleNav())
      dispatch(fetchAllFiles())
    };

    const saveFileHandler = () => {
      const inputNameRefValue = inputNameRef.current.value
      const isEdited = filesList.includes(fileName)
      if (isEdited) {
        dispatch(updateFile({
          fileName,
          fileContent
        }))
      } else if (!isEdited) {
        dispatch(saveFile({
          fileName: `${inputNameRefValue.includes('.md') ? inputNameRefValue : inputNameRefValue + '.md'}`,
          fileContent
        }))
      }
    }
    
    useEffect(() => {
      inputNameRef.current.value = fileName;
      fetchAllFiles()
    }, [fileName])
    

    return (
      <nav className="nav">
          <div className="nav__container">
            <button className="btn--menu" onClick={toggleHandler}>
              <Hamburger toggled={isOpen} color="#fff" />
            </button>
            <h1 className="nav__title">MARKDOWN</h1>
            <div className="nav__file">
              <div className="nav__file-icon">
                <button className="btn--create-new" title='Create new document.' onClick={e => {dispatch(clearFileData()); dispatch(closeNav())}}><DocIcon /></button>
              </div>
             <div className="nav__file-data">
              <label htmlFor="fileName">Document Name</label>
              <input 
                  type="text" 
                  id="fileName"
                  name="fileName" 
                  placeholder='set a doc name...'
                  ref={inputNameRef}
                  required
                  autoComplete="off"
              />
             </div>
            </div>
          </div>
          <div className="nav__container">
            <button className="btn--delete" title='Delete current document.' onClick={() => dispatch(deleteFile(fileName))}><TrashCan /></button>
            <button className="btn--save" title='Save current document.' onClick={saveFileHandler}><SaveIcon /><span>Save Changes</span></button>
            <button className="btn--preview" onClick={(e) => {e.preventDefault(), dispatch(togglePreview())}}>
                    {!isPreviewOpen && <EyeIcon />}
                    {isPreviewOpen && <EyeOffIcon />}
            </button>
          </div>
          <FilesList />
      </nav>
    )
}