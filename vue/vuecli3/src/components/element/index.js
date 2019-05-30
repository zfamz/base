import {
  Container,
  Main,
  Header,
  Select,
  Option,
  OptionGroup,
  Input,
  Dialog,
  Row,
  Col,
  Message,
  Carousel,
  Scrollbar,
  CarouselItem,
  Loading
} from 'element-ui';
const element = {
  install: function (Vue) {
    Vue.use(Container);
    Vue.use(Main);
    Vue.use(Header);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Carousel);
    Vue.use(Scrollbar);
    Vue.use(CarouselItem);
    Vue.use(Loading.directive);
    Vue.prototype.$message = Message;
  }
};
export default element;
