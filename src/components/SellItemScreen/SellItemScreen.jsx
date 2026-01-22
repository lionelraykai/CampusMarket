import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  ChevronDown, 
  Upload, 
  X, 
  Trash2, 
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import './SellItemScreen.css';

const SellItemScreen = ({ onPost }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: 'Like New',
    description: ''
  });

  const [images, setImages] = useState([
    { id: 1, name: 'IMG_5921.jpg', progress: 45, status: 'uploading' },
    { id: 2, name: 'Calculus_Vol1.jpg', status: 'uploaded', preview: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100' }
  ]);

  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="sell-screen-container">
      {/* Header */}
      <header className="sell-header">
        <div className="sell-header-content">
          <div className="sell-brand">
            <div className="sell-logo-wrapper">
              <GraduationCap size={24} color="white" />
            </div>
            <span className="sell-brand-name">Campus Marketplace</span>
          </div>
          <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </header>

      <main className="sell-main">
        <div className="sell-form-wrapper">
          <div className="sell-intro">
            <h1 className="sell-title">Sell an Item</h1>
            <p className="sell-subtitle">Create a new listing to reach thousands of students instantly.</p>
          </div>

          {/* Form Card */}
          <div className="sell-card">
            {/* Photos Section */}
            <div className="form-section">
              <div className="section-header">
                <label className="section-label">Photos</label>
                <span className="photo-count">{images.length}/5 images</span>
              </div>
              
              <div className="photo-upload-grid">
                <div className="dropzone-area">
                  <div className="dropzone-content">
                    <div className="dropzone-icon">
                      <Upload size={24} />
                    </div>
                    <p className="dropzone-text"><strong>Drag & drop or browse</strong></p>
                    <p className="dropzone-subtext">JPEG, PNG up to 10MB</p>
                    <button className="browse-files-btn">Browse Files</button>
                  </div>
                </div>

                <div className="active-uploads">
                  {images.map(img => (
                    <div key={img.id} className="upload-item">
                      <div className="upload-preview">
                        {img.preview ? (
                          <img src={img.preview} alt="Preview" />
                        ) : (
                          <div className="preview-fallback">
                            <Upload size={20} />
                          </div>
                        )}
                      </div>
                      <div className="upload-info">
                        <div className="upload-top">
                          <span className="upload-name">{img.name}</span>
                          {img.status === 'uploading' ? (
                            <span className="upload-progress-text">{img.progress}%</span>
                          ) : (
                            <CheckCircle size={16} className="text-green" />
                          )}
                          <button className="remove-img-btn" onClick={() => removeImage(img.id)}>
                            {img.status === 'uploading' ? <X size={16} /> : <Trash2 size={16} />}
                          </button>
                        </div>
                        {img.status === 'uploading' && (
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${img.progress}%` }}></div>
                          </div>
                        )}
                        {img.status === 'uploaded' && (
                          <span className="uploaded-badge">Uploaded</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Listing Title */}
            <div className="form-section">
              <label className="section-label" htmlFor="title">Listing Title</label>
              <input 
                type="text" 
                id="title"
                name="title"
                placeholder="e.g. Calculus 101 Textbook - 3rd Edition"
                className="sell-input"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Price & Category */}
            <div className="form-row">
              <div className="form-section half">
                <label className="section-label" htmlFor="price">Price</label>
                <div className="price-input-wrapper">
                  <span className="currency-prefix">$</span>
                  <input 
                    type="number" 
                    id="price"
                    name="price"
                    placeholder="0.00"
                    className="sell-input price-input"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-section half">
                <label className="section-label" htmlFor="category">Category</label>
                <div className="select-wrapper">
                  <select 
                    id="category"
                    name="category"
                    className="sell-input select-input"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Textbooks">Textbooks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Dorm Essentials">Dorm Essentials</option>
                  </select>
                  <ChevronDown className="select-icon" size={18} />
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="form-section">
              <label className="section-label">Condition</label>
              <div className="condition-chips">
                {conditions.map(c => (
                  <button 
                    key={c}
                    className={`condition-chip ${formData.condition === c ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, condition: c }))}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-section">
              <label className="section-label" htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description"
                placeholder="Describe the item condition, pickup details, and any other relevant information."
                className="sell-input textarea-input"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={500}
              />
              <div className="char-count">{formData.description.length}/500 characters</div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sell-footer">
            <div className="safety-badge">
              <ShieldCheck size={18} />
              <span>All listings are reviewed for community safety</span>
            </div>
            <div className="sell-actions">
              <button className="save-draft-btn">Save Draft</button>
              <button className="post-listing-btn" onClick={() => { onPost(formData); navigate('/'); }}>Post Listing</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellItemScreen;
