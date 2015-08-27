# jstransformer-markdown-yml

Transform YAML values from Markdown to HTML with markdown-it

Created to be used in [gulp-jade](https://github.com/phated/gulp-jade) when generating static sites.

## Usage example

In **app/data.yml**
```yaml
foo:
  bar: ## Hello world
```

In **.jade** file

Use the format:
`path to .yml file` , `object property (in dot notation)`

```jade
:markdown-yml
  app/data, foo.bar
```