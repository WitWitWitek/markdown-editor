import { useSelector, useDispatch } from "react-redux";
import { selectAllFiles } from "../../context/filesListSlice";
import { fetchFileContent } from "../../context/fileDataSlice";
import { closeNav, selectMenuState, toggleNav} from "../../context/navSlice";
import DocIcon from '../Icons/DocIcon'

export default function FilesList() {
    const dispatch = useDispatch();
    const files = useSelector(selectAllFiles) || [];
    const isMenuOpen = useSelector(selectMenuState);

    const listFileClickHandler = (e) => {
      dispatch(fetchFileContent(e.target.textContent));
      dispatch(closeNav())
    }
    let animationDelay = 0.1
    return (
      <>
        {isMenuOpen && (
          <>
            <ul className="files-list">
              <h3>Choose file from list:</h3>
              {isMenuOpen && files && files.map(
                file => <li 
                          key={file} 
                          onClick={listFileClickHandler}
                          style={{animationDelay: `${animationDelay += 0.05}s`}}
                        >
                          <DocIcon />
                          {file}
                        </li>)}
            </ul>
          </>
        )}
      </>
      )
}
