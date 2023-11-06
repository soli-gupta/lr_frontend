import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
import Header from '@editorjs/editorjs'
// import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';

import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-grids'

import List from '@editorjs/editorjs';

function TextEditor() {
    // RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);


    const defaultRTE = new RichTextEditor({
        height: 340,
        quickToolbarSettings: {
            image: [
                'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
                'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'
            ],
            link: ['Open', 'Edit', 'UnLink']
        },
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|',
                'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        }

    });
    defaultRTE.appendTo('#defaultRTE');
    return (
        <></>
    )
}

export default TextEditor;