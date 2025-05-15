console.log('✅ KashidaXBlockStudio loaded');
import MultiRootEditor from '@ckeditor/ckeditor5-editor-multi-root/src/multirooteditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

window.KashidaXBlockStudio = function (runtime, element) {
  console.log("✅ KashidaXBlockStudio function is being called...");
  const roots = {
    imageRegion: document.querySelector('#imageRegion'),
    textRegion: document.querySelector('#textRegion')
  };

  MultiRootEditor
    .create(roots, {
      plugins: [Essentials, Paragraph, Bold, Italic],
      toolbar: ['bold', 'italic']
    })
    .then(editor => {
      window.kashidaEditor = editor;

      document.getElementById('saveBtn').addEventListener('click', () => {
        const text = editor.getData({ rootName: 'textRegion' });
        const image = editor.getData({ rootName: 'imageRegion' });
        const layout = document.querySelector('.kashida-editor').classList.contains('image-left') ? 'image-left' : 'image-right';

        runtime.notify('save', { state: 'start' });

        runtime.invoke('save_kashida_block', {
          text_content: text,
          image_content: image,
          layout: layout,
        }).then(() => {
          runtime.notify('save', { state: 'end' });
        });
      });
    })
    .catch(error => {
      console.error('CKEditor init error', error);
    });
};
