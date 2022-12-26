import Loading from 'scripts/components/Loading';

window.addEventListener('load', function () {
  const loading = Loading.getInstance();
  loading.getEl().fadeOut(200);
});
console.log((window as any).IS_DEV_ENV, (window as any).APP_URL, (window as any).ASSET_URL);
