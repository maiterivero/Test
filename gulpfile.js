

const gulp = require('gulp');
const setUpDriver = require('./setUpTest');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters'); 
gulp.task('default', () =>    
    // gulp.src('spec/advancedSearch.spec.js')
    // gulp.src('spec/agentsSearch.spec.js')
    // gulp.src('spec/canonicalUrl.spec.js')
    // gulp.src('spec/contentFooter.spec.js')
    // gulp.src('spec/crawlPaths.spec.js')
    // gulp.src('spec/globalFooter.spec.js')
    // gulp.src('spec/listingDetailsPage.spec.js')
     gulp.src('spec/login.spec.js')
    // gulp.src('spec/mainPage.spec.js')
    // gulp.src('spec/portalBlocks.spec.js')
    // gulp.src('spec/propertyBlocks.spec.js')
    // gulp.src('spec/propertySearch.spec.js')
    // gulp.src('spec/remaxInteractions.spec.js')
    // gulp.src('spec/resultPage.spec.js')
    // gulp.src('spec/searchInfoBlock.spec.js')
    // // gulp.src('spec/socialMedia.spec.js')
    //gulp.src('spec/*.spec.js')   
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine({
            //reporter: new reporters.HTMLReporter()           
        }))
       
);
