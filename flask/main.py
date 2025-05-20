import os
import re
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, render_template_string, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), '../react/public/photos')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# === DB Model ===
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(500), nullable=False, unique=True)
    title = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(500), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "author": self.author,
            "date": self.date,
            "summary": self.summary,
            "url": self.image, 
            "content": self.content,
            "created_at": self.created_at.isoformat()
        }


with app.app_context():
    db.create_all()


@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return jsonify([blog.to_dict() for blog in blogs])


# === POST handler for blog upload ===
@app.route('/api/add-blog', methods=['POST'])
def add_blog():
    title = request.form.get('title', '').strip()
    summary = request.form.get('summary', '').strip()
    content = request.form.get('content', '').strip()
    author = request.form.get('author', '').strip()
    image = request.files.get('image')

    if not title or not summary or not content or not author or not image:
        return jsonify({'error': 'All fields are required.'}), 400

    # Generate unique filename
    filename = secure_filename(image.filename)
    ext = os.path.splitext(filename)[1]
    image_name = f"{uuid.uuid4().hex}{ext}"
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
    image.save(image_path)

    # Generate slug
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title).lower().replace(" ", "-") + "-" + uuid.uuid4().hex[:8]
    date = datetime.now().strftime('%b %d, %Y')

    new_blog = Blog(
        slug=slug,
        title=title,
        author=author,
        summary=summary,
        content=content,
        date=date,
        image=image_name
    )
    db.session.add(new_blog)
    db.session.commit()

    return jsonify({'message': 'Blog added successfully!'}), 201


@app.delete('/api/delete-blog')
def delete():
    slug = request.args.get("slug")
    print(slug)
    blog = Blog.query.filter_by(slug=slug).first()
    if not blog:
        print("Not found")
        return jsonify({"error": "Blog not found"}), 404
    print(" found")
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], blog.image))
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted successfully"}), 200



if __name__ == '__main__':
    app.run(debug=True, port=4000)
