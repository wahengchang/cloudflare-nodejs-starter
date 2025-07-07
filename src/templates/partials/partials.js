// Template partials as JavaScript modules
// These are reusable template fragments for Mustache

export const headerPartial = `<header><h1>{{headerTitle}}</h1></header>`;
export const footerPartial = `<footer>{{#footerText}}<p>{{footerText}}</p>{{/footerText}}</footer>`;

export default {
  header: headerPartial,
  footer: footerPartial,
};
