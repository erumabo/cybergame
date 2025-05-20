import { Plugins } from "phaser";
import * as dat from 'dat.gui';

export default class DatGui extends Plugins.BasePlugin {
  gui: dat.GUI;

  constructor(pluginManager: any) {
    super(pluginManager);
    this.gui = new dat.GUI();
  }
}
