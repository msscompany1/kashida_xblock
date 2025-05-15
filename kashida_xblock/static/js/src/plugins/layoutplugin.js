import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class LayoutPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // Image Left / Text Right
        editor.ui.componentFactory.add('layoutLeft', locale => {
            const button = new ButtonView(locale);
            button.set({
                label: 'Image Left',
                withText: true,
                tooltip: true
            });

            button.on('execute', () => {
                editor.sourceElement.parentElement.classList.remove('image-right');
                editor.sourceElement.parentElement.classList.add('image-left');
                editor.layoutChoice = 'image-left';
            });

            return button;
        });

        // Image Right / Text Left
        editor.ui.componentFactory.add('layoutRight', locale => {
            const button = new ButtonView(locale);
            button.set({
                label: 'Image Right',
                withText: true,
                tooltip: true
            });

            button.on('execute', () => {
                editor.sourceElement.parentElement.classList.remove('image-left');
                editor.sourceElement.parentElement.classList.add('image-right');
                editor.layoutChoice = 'image-right';
            });

            return button;
        });
    }
}
