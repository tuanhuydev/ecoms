class Sidebar {
    private toggleBtn: HTMLButtonElement;
    private sidebar: HTMLElement;

    constructor () {
      this.toggleBtn = document.querySelector('.sidebar__toggle');
      this.sidebar = document.querySelector('.sidebar');
      this.applyBind();
    }

    private applyBind () {
      const sidebarCompress: boolean = Boolean(localStorage.getItem('sidebarCompress'));
      if (sidebarCompress) {
        this.sidebar.classList.add('sidebar--compress');
      }

      this.toggleBtn.addEventListener('click', (e) => {
        this.tempSaveSidebarState();
        this.sidebar.classList.toggle('sidebar--compress');
      });
    }

    private tempSaveSidebarState () {
      if (this.sidebar.classList.contains('sidebar--compress')) {
        localStorage.removeItem('sidebarCompress');
      } else {
        localStorage.setItem('sidebarCompress', 'true');
      }
    }
}
export default Sidebar;
