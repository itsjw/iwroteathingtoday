# I Wrote A Thing Today

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/AEMubo6XgXjBRq7V3urxNFC3/bcallaars/iwroteathingtoday'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/AEMubo6XgXjBRq7V3urxNFC3/bcallaars/iwroteathingtoday.svg' /></a>

Nano blog made for the lazy writers, that don't want to commit to a full blog, but perhaps want to write more than just 140 characters. Needs to be hosted on AWS S3 as it updates the posts on the fly.

# Features

- No back end or continous uploads necessary.
- Direct update on AWS S3.
- Supports many Markdown styles.
- Supports [twemoji](https://github.com/twitter/twemoji) emoji's.

### Tech

This nano blog uses the following tech:

* [React](https://facebook.github.io/react/) - Popular JavaScript library for building UI. 
* [Ant Design](http://ant.design) - Great UI design library.
* [AWS JS](https://aws.amazon.com/javascript/) - For directly updating the posts.

And of course "i wrote a thing" itself is open source with a [public repository](http://iwroteathing.today)
 on GitHub.

## Usage

Once built and deployed on AWS S3, make sure you create a new user with a policy that only allows to `GET` and `PUT` the `posts.json` inside your S3 bucket.

So for example, your policy could look like this:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1504726843000",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::some-bucket-name-dokq0/posts.json"
            ]
        }
    ]
}
```

Then what you want to do is create a new user with this policy attached and save the users `Access Key Id` and `Secret Key Access`.

If your site is deployed through Cloudfront, what you want to do is make sure that the routes resolves correctly, as it's not handled by physical files. Once the S3 can't serve a file, it will throw a `403` status, which in this case means that it can't or it won't give you the file. So what we want to do is set up Cloudfront to redirect all `404` and `403` returns from S3 to the `index.html` file and let it sort out what we need.

To do this, go to your Cloudfront distribution, tab "Error Pages" and click on "Create Custom Error Response". Now you need to do this for "HTTP Error Code" `403` and `404` with the following settings:

```
Error Caching Minimum TTL (seconds): 0
Customize Error Response: Yes
Response Page Path: /index.html
HTTP Response Code: 200
```

Now you are ready to set up your admin panel. Go to your site, and add `/admin` to the end of the URL. This will show you a form with the details of your S3 bucket. Add the `Region`, `Bucket`, `Access Key Id` and `Secret Access Key` to retrieve the posts from the S3 bucket. Now, everything *except* the `Secret Access Key` will be saved in the browser storage. So if you want to update, delete or create new posts all you have to do is input the `Secret Access Key`.

## Installation

This nano blog is made with [Create React App](https://github.com/facebookincubator/create-react-app). Install the dependencies and devDependencies and start the server.

```sh
$ cd iwroteathingtoday
$ yarn install
$ yarn start
```

Build the production environment...

```sh
$ yarn build
```
After this is done, the `build` directory contents can be uploaded to your AWS S3 environment. Make sure not to overwrite the `posts.json` file if you already have posts.

## Development

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.
6. ???
7. Profit!

## Todos

 - Allow easier style customizability.
 - Sharing of post on Twitter / Facebook.
 - Dedicated post page, including URL.
 - Perhaps have commenting system? (Disqus?)
 - Paging of posts.
 - Write tests, like, any.

## Credits
  - [Joseph Callaars](https://github.com/bcallaars)

## License
MIT
