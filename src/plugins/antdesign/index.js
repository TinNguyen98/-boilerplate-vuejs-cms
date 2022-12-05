import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'

import {
  Card,
  Table,
  Tooltip,
  Popconfirm,
  Layout,
  Menu,
  Icon,
  Button,
  Breadcrumb,
  Select,
  Input,
  Switch,
  DatePicker,
  TimePicker,
  Modal,
  Empty,
  Collapse,
  notification,
  message,
  Progress,
  Pagination,
  Popover,
  Spin,
  Transfer,
  Radio,
  Checkbox,
  Tabs,
  ConfigProvider,
  Row,
  Col,
  Steps,
  Calendar,
  Upload,
  Dropdown,
  Result
} from 'ant-design-vue'

Vue.use(Card)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Popconfirm)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(Select)
Vue.use(Input)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Modal)
Vue.use(Empty)
Vue.use(Progress)
Vue.use(Pagination)
Vue.use(Collapse)
Vue.use(Popover)
Vue.use(Spin)
Vue.use(Transfer)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Steps)
Vue.use(ConfigProvider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Calendar)
Vue.use(Upload)
Vue.use(Dropdown)
Vue.use(Result)
Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
