import {Element} from '../../@polymer/polymer/polymer-element.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';

/**
 * `oc-signin`
 * Sign Element
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class OcSignin extends Element {
	static get template() {
		return `
    <style>
      :host {
        display: block;
      }
      paper-button > iron-icon {
        margin-right: 0.4em;
      }
    </style>

    <template is="dom-if" if="{{ !signedIn }}">
      <paper-button on-tap="signIn">
        <iron-icon icon="cloud"></iron-icon> Sign In
      </paper-button>
    </template>

    <template is="dom-if" if="{{ signedIn }}">
      <paper-icon-button on-tap="signOut" icon="power-settings-new"></paper-icon-button>
    </template>
`;
	}

	/**
	 * Fired when signed in.
	 * @param {Object} detail The user object.
	 * @event oc-sign-in
	 */
	static get is() {
		return 'oc-signin';
	}

	static get properties() {
		return {
			/**
			 * Is the user signed in
			 */
			signedIn: {
				type: Boolean,
				computed: '_computeSignedIn(user)',
				notify: true
			},
			/**
			 * The signed in user
			 */
			user: {
				type: Object,
				notify: true
			}

		};
	}

	ready() {
		super.ready();
	}

	/**
	 * Sign in user. Redirects the user to authorization server for signing in.
	 */
	signIn() {
		this.dispatchEvent(new CustomEvent('oc-sign-in', {
			bubbles: true, composed: true
		}));
	}

	/**
	 * Sign out the user
	 */
	signOut() {
		this.dispatchEvent(new CustomEvent('oc-sign-out', {
			bubbles: true, composed: true
		}));
	}

	_computeSignedIn(user) {
		return user !== null;
	}
}

window.customElements.define(OcSignin.is, OcSignin);
