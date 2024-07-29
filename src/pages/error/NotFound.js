// Importing css
import style from "./NotFound.module.css";

// Error Page
function NotFound(){
    return(
        <div className={style.parentErrorContainer}>
            <h1 className={style.errorTitle}>Page Not Found , Something went wrong!!!!!!</h1>
            <div className={style.errorImageContainer}>
                <img src="https://myaccess.myflfamilies.com/icons/critical.gif" className={style.errorImage} alt="error-image"/>
            </div>
        </div>
    );
}


// Exporting error-page
export default NotFound;