"""Serve the built site with consistent JS MIME types on Windows and Linux."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


if __name__ == '__main__':
    SimpleHTTPRequestHandler.extensions_map.update({'.js': 'text/javascript', '.mjs': 'text/javascript'})
    server = ThreadingHTTPServer(('127.0.0.1', 4174), partial(SimpleHTTPRequestHandler, directory='_site'))
    print('Preview: http://127.0.0.1:4174', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
