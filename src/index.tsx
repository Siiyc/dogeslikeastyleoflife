import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "App";

import { store, persistor } from "store";
import "assets/styles/index.css";
import "utils/i18n";


const application = (
  <Provider store={store}>
    <Suspense fallback={<div>loading</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Suspense>
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(application);
