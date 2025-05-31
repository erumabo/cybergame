import { Plugins } from "phaser";
import { GUI } from 'dat.gui';

export default class DatGui extends Plugins.BasePlugin {
  gui: GUI;

  constructor(pluginManager: any) {
    super(pluginManager);
    this.gui = new GUI();
  }
  
  override destroy() {
    super.destroy();
  }
}
