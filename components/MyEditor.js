import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
export const MyEditor = () => {
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',

    ];

    const onChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        import('react-quill/dist/quill.snow.css');
    }, [])

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder="Enter some text here"
        />
    );
};