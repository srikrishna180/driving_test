import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/instructors","routes/instructors.tsx"),
    route("/testimonials","routes/testimonials.tsx"),
    route("/locations","routes/locations.tsx"),
    route("/contact","routes/contact.tsx"),
    route("/lessons","routes/lessons.tsx"),
    route("/packages","routes/packages.tsx"),
    route("/terms","routes/terms.tsx"),
    route("/privacy","routes/privacy.tsx"),
    route( "/packages/:slug", "routes/package.$slug.tsx"),
] satisfies RouteConfig;
