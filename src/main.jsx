import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import { registerLicense } from "@syncfusion/ej2-base";
import { ContextProvider } from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'
const queryClient = new QueryClient();
registerLicense(
"ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5XdkdjW3tccnJQRGdV");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
       <QueryClientProvider client={queryClient}>
    <ContextProvider>
       

     <PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
  
    </ContextProvider>
        </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
