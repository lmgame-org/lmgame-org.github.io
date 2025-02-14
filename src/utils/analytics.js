import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-Z6HLC73MKX"); // Replace with your Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
