const imageViewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('image-viewer-image');
const viewerTitle = document.getElementById('image-viewer-title');
const viewerDescription = document.getElementById('image-viewer-description');
let viewerTrigger = null;

document.querySelectorAll('.image-preview, .project-detail').forEach((button) => {
    button.addEventListener('click', () => {
        viewerTrigger = button;
        const project = button.closest('.card');
        const image = button.querySelector('img') || project?.querySelector('img');
        const description = project?.querySelector('.achievement-description') ||
            project?.querySelector('.card-body p');
        const details = [
            project?.querySelector('.achievement-meta'),
            description,
            project?.querySelector('.achievement-note')
        ].filter(Boolean).map((element) => element.textContent.trim()
            .replace(/\s+/g, ' ').replace(/。\s*/g, '。\n').trimEnd());

        viewerImage.hidden = !image;
        if (image) {
            viewerImage.src = image.currentSrc || image.src;
            viewerImage.alt = image.alt;
        } else {
            viewerImage.removeAttribute('src');
            viewerImage.alt = '';
        }
        viewerTitle.textContent = project?.querySelector('h5')?.textContent || image?.alt || '作品與成果';
        viewerDescription.textContent = details.join('\n\n');
        viewerDescription.hidden = details.length === 0;
        imageViewer.showModal();
        document.body.classList.add('image-viewer-open');
    });
});

// Only clicks outside the dialog close it; clicks on the image stay open.
imageViewer.addEventListener('click', (event) => {
    if (event.target !== imageViewer) return;
    const bounds = imageViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
        imageViewer.close();
    }
});

imageViewer.addEventListener('close', () => {
    document.body.classList.remove('image-viewer-open');
    viewerImage.removeAttribute('src');
    viewerTrigger?.focus({ preventScroll: true });
});
