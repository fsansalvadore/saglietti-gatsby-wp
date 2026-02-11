### saglietti.it

Tech stack:
- GatsbyJS
- Tailwindcss
- Netlify (cloud)

## Troubleshooting

### "Cannot query field" after adding new acf fields in Wordpress

### Error:
```
One unhandled GraphQL error found in your files. See the list below to fix it:


Cannot query field "chisiamoacf" on type "WORDPRESS_Page".
ERROR #85923
Open in Editor
/Users/francescosansalvadore/code/github/fsansalvadore/saglietti-gatsby-wp/src/pages/chi-siamo.jsx:23:9
There was an error in your GraphQL query:

Cannot query field "chisiamoacf" on type "WORDPRESS_Page".

If you don't expect "chisiamoacf" to exist on the type "WORDPRESS_Page" it is most likely a typo. However, if you expect "chisiamoacf" to exist there are a couple of solutions to common problems:

- If you added a new data source and/or changed something inside gatsby-node/gatsby-config, please try a restart of your development server.
- You want to optionally use your field "chisiamoacf" and right now it is not used anywhere.

It is recommended to explicitly type your GraphQL schema if you want to use optional fields.
````

### Fix:
Stop dev server, then `gatsby clean` and restart `gatsby develop`.