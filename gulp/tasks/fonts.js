export const fonts = () => {
    return app.gulp.src(app.path.src.fonts, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "fonts",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.plugins.browsersync.stream());
}