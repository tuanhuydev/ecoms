import Cookie from 'js-cookie';
import { URLS } from '../configs/constants';

class QuickUser {
  private panel: HTMLElement;
  private toggleBtn: HTMLButtonElement;
  private closeBtn: HTMLButtonElement;
  private signOutBtn: HTMLButtonElement;

  constructor() {
    this.toggleBtn = document.querySelector('.quick-user__toggle');
    this.panel = document.querySelector('.quick-user__panel');
    this.closeBtn = document.querySelector('.panel-header__close');
    this.signOutBtn = document.querySelector('.panel-account__sign-out');
    this.applyBind();
  }

  private toggleQuickUser() {
    if (this.panel) {
      this.panel.classList.toggle('quick-user__panel--active');
    }
  }

  private signOutUser() {
    Cookie.remove('securityId');
    window.location.href = `${URLS.app}/auth/login`;
  }

  private applyBind() {
    this.toggleBtn.addEventListener('click', () => this.toggleQuickUser());
    this.closeBtn.addEventListener('click', () => this.toggleQuickUser());
    this.signOutBtn.addEventListener('click', () => this.signOutUser());
  }
}
export default QuickUser;
