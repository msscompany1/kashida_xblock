from xblock.core import XBlock
from xblock.fields import String, Scope
from xblock.fragment import Fragment
from xblockutils.resources import ResourceLoader
from xblockutils.studio_editable import StudioEditableXBlockMixin
import pkg_resources


class KashidaXBlock(XBlock):
    display_name = String(display_name="Kashida Block", default="Kashida Block", scope=Scope.settings)
    text_content = String(default="<p>Start writing here...</p>", scope=Scope.content)
    image_content = String(default="", scope=Scope.content)
    layout = String(default="image-left", scope=Scope.content)

    def student_view(self, context=None):
        html = self.render_template("static/html/kashida_view.html", {
            "text_content": self.text_content,
            "image_content": self.image_content,
            "layout": self.layout,
        })
        frag = Fragment(html)
        frag.add_css(self.resource_string("static/css/style.css"))
        return frag


    def studio_view(self, context=None):
        html = self.render_template("static/html/kashida_edit.html", {
            "text_content": self.text_content,
            "layout": self.layout,
        })
        frag = Fragment(html)
        frag.add_css(self.resource_string("static/css/style.css"))
        frag.add_javascript_url(self.runtime.local_resource_url(self, 'static/js/kashida.bundle.js'))
        frag.initialize_js('KashidaXBlockStudio')
        return frag
    def resource_string(self, path):
        """Helper to load static resources from the XBlock package."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def render_template(self, template_path, context={}):
        """Simple templating: replace {{ key }} in template with values from context."""
        html = self.resource_string(template_path)
        for key, val in context.items():
            html = html.replace(f"{{{{ {key} }}}}", val)
        return html
    @XBlock.json_handler
    def save_kashida_block(self, data, suffix=''):
        self.text_content = data.get('text_content', '')
        self.image_content = data.get('image_content', '')
        self.layout = data.get('layout', 'image-left')
        return {"result": "success"}

    @staticmethod
    def workbench_scenarios():
        return [
            ("KashidaXBlock Example", "<kashida/>")
        ]
