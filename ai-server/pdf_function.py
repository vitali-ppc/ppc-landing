def generate_pdf_from_html(text: str) -> bytes:
    """Створює простий PDF з тексту"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.lib.units import inch
        from io import BytesIO
        
        # Створюємо буфер для PDF
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        
        # Отримуємо стилі
        styles = getSampleStyleSheet()
        
        # Додаємо заголовок
        title = Paragraph("PPCSet AI Assistant - Chat Export", styles['Heading1'])
        story.append(title)
        
        # Додаємо дату
        from datetime import datetime
        date_text = f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        date_para = Paragraph(date_text, styles['Normal'])
        story.append(date_para)
        
        # Додаємо розділювач
        story.append(Paragraph("<br/>", styles['Normal']))
        
        # Розбиваємо текст на параграфи
        lines = text.split('\n')
        for line in lines:
            if line.strip():
                # Замінюємо markdown на HTML теги
                line = line.replace('**', '<b>').replace('**', '</b>')
                line = line.replace('*', '<i>').replace('*', '</i>')
                para = Paragraph(line, styles['Normal'])
                story.append(para)
        
        # Генеруємо PDF
        doc.build(story)
        
        # Отримуємо bytes
        pdf_bytes = buffer.getvalue()
        buffer.close()
        
        return pdf_bytes
        
    except Exception as e:
        # Якщо щось пішло не так, повертаємо простий текст
        return f"PDF generation failed: {str(e)}".encode('utf-8') 