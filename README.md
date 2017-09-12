# grid

This grid is a very variable grid system with multiple features:
- enable/disable certain features for your needs
- flexbox compatible
- visibility-features
- retina, touch and orientation-detection (touch-detection needs something like modernizr)
- offset-classes
- fluid layout
- variable and overlapping breakpoints

In the minimal configuration just 3KB small. The big example config weights just 10KB.

## Version
1.0.0

## Installation

```sh
$ npm install
```
## Usage

Type ``npm run compile`` in your console, to generate the ``grid.css`` file. Now you can open the ``example/*.html`` files in your browser to see the grid in action.

To compile the CSS and compress it at the same time, use ``npm run compress``.

## Settings

Default options with comments:

```scss
$gridSettings: (
    config: (
        /*
         * settings for the generated classnames
         */
        naming: (
            prefix: 'grid--',
            container: 'container',
            row: 'row',
            col: 'col',
            offset: 'offset',
            hide: 'hide',
            show: 'show',
            only: 'only',
            retina: 'retina',
            no-retina: 'no-retina',
            landscape: 'landscape',
            portrait: 'portrait',
            touch: 'touch',
            no-touch: 'no-touch',
            separator: '-'
        ),
        /*
         * target of the media queries - should usually be 'only screen', but can by left empty to target print styles as well
         */
        mqTarget: 'only screen',
        /*
         * base font size in px, is used for rem calculation
         */
        baseFontSize: 16px,
        /*
         * grid origin
         */
        origin: 'left',
        /*
         * enabled features - possible features:
         * - classes:       - generates the classes
         * - fluid          - if the grid should generally be fluid - container widths will be 100% in every breakpoint
         * - visibility     - visibility features (show for breakpoint x, hide for another)
         * - adv-visibility - advanced visibility (decide which type of display the container sgould have: inline, inline-block, block)
         * - retina         - show element only for (no-) retina devices
         * - orientation    - show element only in landscape/portrait-mode
         * - touch          - show element only on (no-)touch devices
         * - offset         - enables offset-classes
         *
         * - all features disabled: '' - only grid
         */
        features: classes visibility retina orientation touch offset,
        /*
         * switch between modes:
         * - float      - default grid mode
         * - flex       - flexbox mode
         */
        mode: float
    ),
    /*
     * breakpoint definitions
     */
    breakpoints: (
        /*
         * breakpoint name, can be changed to whatever you want, changes class names obviously
         *
         * virtual:     exclude breakpoint from class rendering, breakpoint can still be used in mq-mixin   - optional, default: false, bool
         * content:     content width in px, can be set to 100% for fluid breakpoint                        - required if virtual: false, size
         * padding:     content padding in px, left and right of the grid                                   - required if virtual: false, size
         * gutter:      grid gutter width in px, between columns                                            - required if virtual: false, size
         * columnCount: number of columns you want to heave:                                                - required if virtual: false, number
         * min:         min width in px, will fallback to no min width (phone breakpoint)                   - optional, size
         * max:         max width in px, will fallback to no min width (xxxl-breakpoint)                    - optional, size
         *
         * You can use this format to create for example overlapping breakpoints, for different device categories
         */
        small: (
            max: 467px,
            content: 100%,
            padding: 10px,
            gutter: 6px,
            columnCount: 12
        ),
        medium: (
            min: 468px,
            max: 1023px,
            content: 468px,
            padding: 20px,
            gutter: 12px,
            columnCount: 12
        ),
        large: (
            min: 1024px,
            content: 1024px,
            padding: 25px,
            gutter: 16px,
            columnCount: 12
        ),
        phone: (
            virtual: true,
            max: 767px,
        ),
        tablet: (
            virtual: true,
            min: 768px,
            max: 1279px
        ),
        desktop: (
            virtual: true,
            min: 1280px
        )
    )
) !default;
```

## Example usage in your project

Copy the full ``scss``-folder to your project or import ``grid.scss`` in your main SCSS-file. Set the config options you want to overwrite, provide the full breakpoints you need. Then start the grid. For example:

```scss
@import "../../libs/grid/src/scss/grid.scss"

$grid: (
    config: (
        features: classes visibility retina orientation touch offset,
    ),
    breakpoints: (
        small: (
            max: 467px,
            content: 100%,
            padding: 10px,
            gutter: 6px,
            columnCount: 6
        ),
        medium: (
            min: 468px,
            max: 1023px,
            content: 468px,
            padding: 20px,
            gutter: 12px,
            columnCount: 12
        ),
        large: (
            min: 1024px,
            max: 1439px,
            content: 1024px,
            padding: 25px,
            gutter: 16px,
            columnCount: 12
        ),
        xlarge: (
            min: 1440px,
            content: 1440px,
            padding: 35px,
            gutter: 24px,
            columnCount: 12
        ),
        phone: (
            virtual: true,
            max: 767px,
        ),
        tablet: (
            virtual: true,
            min: 768px,
            max: 1279px
        ),
        desktop: (
            virtual: true,
            min: 1280px
        )
    )
);

@include grid($grid);
```

This will generate the full grid classes. If you want to use grid in mixin-mode to build your own classes, you can just remove the feature ``classes`` from the configuration.

### mixin mode

When you removed ``classes`` from your features, you need to use the grid in mixin mode. This means, you need to build the grid on your own. For example:

*Note: You'll not (yet) be able to use visibility- and offset-features in mixin-mode*
```scss
.theContainer {
    // generates the main container
    @include generate-container();
}

.someRowElement {
    // generates a grid row
    @include generate-row();
}

.someColumnElement {
    // generates a column with the span of 8
    @include generate-single-column(8);
}

.anotherColumnElement {
    // generates a colum with a span of 4, should fit with the other column in one line in a 12-column-grid
    @include generate-single-column(4);
}

```

## MQ-Mixin

One special feature of the grid is the mq-mixin, which is a allround mixin for building media queries easily:

```scss
.someElement {
    // builds a media query for every screen bigger than (and equal) the medium breakpoint
    @include mq(min medium) {
        padding: 10px 0;
    }

    // builds a media query for every screen smaller than (and equal) the small breakpoint
    @include mq(max small) {
        color: red;
    }

    // builds a media query for every screen bigger than (and equal) 320px
    @include mq(min 320px) { // works as well with "rem"
        color: red;
    }

    // builds a media query for just the large breakpoint
    @include mq(large) { // can be writte as "mq(eq large)" as well
        text-align: right;
    }

    // builds a media query for retina-devices - note: the prefix "no-" is also possible!
    @include mq(retina) {
        font-weight: 100;
    }

    // builds a media query for no-touch-devices - note: removing the prefix "no-" is also possible!
    // note 2: requires something like modernizr, which adds ".touch" and ".no-touch" to the html element!
    @include mq(no-touch) {
        font-weight: 100;
    }

    // builds a media query for landscape orientation - note: portrait is also possible
    @include mq(landscape) {
        width: 200%;
    }

    // builds a media query for only portrait orientaion AND touch devices - it combines both media queries to one
    @include mq(portrait) {
        @include mq(touch) {
            display: none;
        }
    }
}

```
