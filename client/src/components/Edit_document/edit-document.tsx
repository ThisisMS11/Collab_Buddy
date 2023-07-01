import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState,useEffect,useRef} from 'react';

//add resize image
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);




const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
        ['image', 'code-block']
    ],
    imageResize: {
        displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white',
          },
          modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },

};

const Edit_Document = () => {
    const [value, setValue] = useState('');
    const quillRef = useRef(null); // Create a ref for the ReactQuill component

    const changeHandler = (content:string) => {
        setValue(content);
        console.log(content)
    }

      

    return (
        <div className='mx-auto w-[90%] mt-[40px] col-span-9' style={{ height: 'calc(100vh - 200px)' }}>
            <ReactQuill ref={quillRef} theme="snow" onChange={changeHandler} value={value} modules={modules} className='h-[100%]  outline-[5px]' />
        </div>
    )
}

export default Edit_Document;