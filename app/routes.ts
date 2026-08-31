import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // route("/instructors","routes/instructors.tsx"),
    route("/testimonials","routes/testimonials.tsx"),
    route("/service-areas","routes/service-areas.tsx"),
    route("/contact","routes/contact.tsx"),
    route("/videos","routes/videos.tsx"),
    route("/lessons","routes/lessons.tsx"),
    route("/packages","routes/packages.tsx"),
    route("/terms","routes/terms.tsx"),
    route("/privacy","routes/privacy.tsx"),
    route("/thank-you","routes/thank-you.tsx"),
    // Booking lives here, not on the app subdomain, so it carries this
    // customer's theme, navbar and footer. Data comes from the app's API.
    route("/book","routes/book.tsx"),
    route("/book/confirm","routes/book.confirm.tsx"),
    route( "/packages/:slug", "routes/package.$slug.tsx"),
] satisfies RouteConfig;
