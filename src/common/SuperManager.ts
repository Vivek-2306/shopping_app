class SuperManger {
    body: any;
    headers: any;
    cookies: any;
    query: any;
    params: any;
    user: any;
    files: any;
    constructor(req?: any) {
        this.req = req
    }

    set req(_req: any) {
        this.body = _req.body;
        this.headers = _req.headers;
        this.cookies = _req.cookies;
        this.query = _req.query;
        this.params = _req.params;
        this.user = _req.user;
        this.files = _req.files;
    }
}
