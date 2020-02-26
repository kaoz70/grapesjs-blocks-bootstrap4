import Collapse from './components/Collapse';
import Dropdown from './components/Dropdown';
import TabsNavigation from "./components/tabs/TabsNavigation";
import TabsPanes from "./components/tabs/TabsPanes";
import Tab from "./components/tabs/Tab";
import TabPane from "./components/tabs/TabPane";
import Form from "./components/Form";
import Input from "./components/Input";
import InputGroup from "./components/InputGroup";
import Textarea from "./components/Textarea";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";
import Radio from "./components/Radio";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";
import ButtonToolbar from "./components/ButtonToolbar";
import Label from "./components/Label";
import Link from "./components/Link";
import FileInput from "./components/FileInput";
import Image from "./components/Image";
import Video from "./components/video/Video";
import Embed from "./components/video/Embed";
import Paragraph from "./components/Paragraph";
import Header from "./components/Header";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Alert from "./components/Alert";
import MediaObject from "./components/MediaObject";
import ColumnBreak from "./components/ColumnBreak";
import Column from "./components/Column";
import Row from "./components/Row";
import Container from "./components/Container";
import Text from "./components/Text";
import Default from "./components/Default";


export default (editor, config = {}) => {
  const c = config;
  const domc = editor.DomComponents;
  const blocks = c.blocks;
  const cats = c.blockCategories;

  const traits = {
    id: {
      name: 'id',
      label: c.labels.trait_id,
    },
    for: {
      name: 'for',
      label: c.labels.trait_for,
    },
    name: {
      name: 'name',
      label: c.labels.trait_name,
    },
    placeholder: {
      name: 'placeholder',
      label: c.labels.trait_placeholder,
    },
    value: {
      name: 'value',
      label: c.labels.trait_value,
    },
    required: {
      type: 'checkbox',
      name: 'required',
      label: c.labels.trait_required,
    },
    checked: {
      label: c.labels.trait_checked,
      type: 'checkbox',
      name: 'checked',
      changeProp: 1
    }
  };

  if (cats.media) {
    if (blocks.image) {
      Image(domc);
    }

    if (blocks.video) {
      Embed(domc);
      Video(domc);
    }
  }

  // Rebuild the default component and add utility settings to it (border, bg, color, etc)
  if (cats.basic) {
    if (blocks.default) {
      Default(domc);
    }

    // Rebuild the text component and add display utility setting
    if (blocks.text) {
      Text(domc);
    }

    // Rebuild the link component with settings for collapse-control
    if (blocks.link) {
      Link(editor);
    }

    // Basic
    /*if (blocks.list) {
      List(domc);
    }*/

    /*if (blocks.description_list) {
    }*/

  }

  // LAYOUT
  if (cats.layout) {
    if (blocks.container) {
      Container(domc);
    }
    if (blocks.row) {
      Row(domc);
    }
    if (blocks.column) {
      Column(domc);
      ColumnBreak(domc);
    }
    // Media object
    if (blocks.media_object) {
      MediaObject(domc);
    }
  }

  // Bootstrap COMPONENTS
  if (cats.components) {
    // Alert
    if (blocks.alert) {
      Alert(domc);
    }

    if (blocks.tabs) {
      TabsNavigation(domc, config);
      Tab(domc, config);
      TabsPanes(domc, config);
      TabPane(domc, config);
    }

    // Badge
    if (blocks.badge) {
      Badge(domc);
    }

    // Card
    if (blocks.card) {
      Card(domc, editor);
    }

    // Collapse
    if (blocks.collapse) {
      Collapse(editor);
    }

    // Dropdown
    if (blocks.dropdown) {
      Dropdown(editor);
    }

  }

  // TYPOGRAPHY
  if (cats.typography) {
    if (blocks.header) {
      Header(domc);
    }
    if (blocks.paragraph) {
      Paragraph(domc);
    }
  }

  if(cats.forms) {
    Form(domc, traits, config);
    Input(domc, traits, config);
    FileInput(domc, traits, config);
    InputGroup(domc, traits, config);
    Textarea(domc, traits, config);
    Select(editor, domc, traits, config);
    Checkbox(domc, traits, config);
    Radio(domc, traits, config);
    Label(domc, traits, config);

    if (blocks.button) {
      Button(domc);
    }

    if (blocks.button_group) {
      ButtonGroup(domc);
    }

    if (blocks.button_toolbar) {
      ButtonToolbar(domc);
    }
  }

}
