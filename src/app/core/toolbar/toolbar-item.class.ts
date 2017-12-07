export class ToolbarItem {
  title: string;
  route? = '';
  icon: string;
  onClick?: () => void = () => () => { };
}
