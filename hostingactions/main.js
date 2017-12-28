import HostingActionsApp from './HostingActionsApp.html';
import EmailAction from './components/EmailAction.html';

const app = new HostingActionsApp({
    target: document.getElementById('hostingactions'),
    hydrate: true
});

export default {
    EmailAction
}
