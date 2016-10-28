'use babel';

import EmpAppViewView from './emp-app-view-view';
import { CompositeDisposable } from 'atom';

export default {

  empAppViewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.empAppViewView = new EmpAppViewView(state.empAppViewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.empAppViewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'emp-app-view:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.empAppViewView.destroy();
  },

  serialize() {
    return {
      empAppViewViewState: this.empAppViewView.serialize()
    };
  },

  toggle() {
    console.log('EmpAppView was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
