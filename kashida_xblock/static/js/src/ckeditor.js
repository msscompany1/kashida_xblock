import MultiRootEditor from '@ckeditor/ckeditor5-editor-multi-root/src/multirooteditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LayoutPlugin from './plugins/layoutplugin';

MultiRootEditor
    .create({
        imageRegion: document.querySelector('#imageRegion'),
        textRegion: document.querySelector('#textRegion')
    }, {
        plugins: [ Essentials, Paragraph, Bold, Italic, Link, LayoutPlugin ],
        toolbar: [ 'bold', 'italic', 'link', '|', 'layoutLeft', 'layoutRight' ]
    })
    .then(editor => {
        window.kashidaEditor = editor;
        document.querySelector('#saveBtn').addEventListener('click', () => {
            const imageHTML = editor.getData({ rootName: 'imageRegion' });
            const textHTML = editor.getData({ rootName: 'textRegion' });
            console.log('Save:', imageHTML, textHTML, editor.layoutChoice);
        });
    })
    .catch(console.error);
