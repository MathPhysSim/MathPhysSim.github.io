from scholarly import scholarly

def fetch_and_generate_html(author_id):
    try:
        print(f"Fetching author with ID: {author_id}")
        author = scholarly.search_author_id(author_id)
        print(f"Author found: {author['name']}")
        
        print("Filling publications...")
        author = scholarly.fill(author, sections=['publications'])
        
        publications = author['publications']
        # Sort by year descending, handling missing years
        publications.sort(key=lambda x: int(x['bib'].get('pub_year', 0)), reverse=True)
        
        html_output = '<div class="publications-list">\n'
        
        current_year = None
        
        for pub in publications:
            bib = pub['bib']
            title = bib.get('title', 'Untitled')
            year = bib.get('pub_year', 'N/A')
            citation = bib.get('citation', 'N/A')
            
            # Create a year header if it changes
            if year != current_year:
                if current_year is not None:
                    html_output += '  </ul>\n'
                html_output += f'  <h3 class="year-header">{year}</h3>\n'
                html_output += '  <ul class="publication-year-list">\n'
                current_year = year
            
            # Try to get more details if possible, but 'fill' on each pub is too slow/risky for blocking
            # We'll stick to basic info available in the list
            
            pub_url = pub.get('pub_url', '')
            
            html_output += '    <li class="publication-item">\n'
            if pub_url:
                html_output += f'      <a href="{pub_url}" target="_blank" class="publication-title">{title}</a>\n'
            else:
                html_output += f'      <span class="publication-title">{title}</span>\n'
            
            html_output += f'      <div class="publication-meta">\n'
            if 'author' in bib:
                 html_output += f'        <span class="publication-authors">{bib["author"]}</span><br>\n'
            if 'venue' in bib:
                 html_output += f'        <span class="publication-venue">{bib["venue"]}</span>\n'
            html_output += f'      </div>\n'
            
            # Add details section
            num_citations = pub.get('num_citations', 0)
            html_output += f'      <details class="publication-details">\n'
            html_output += f'        <summary class="publication-summary">Show Details (Citations: {num_citations})</summary>\n'
            html_output += f'        <div class="publication-abstract">\n'
            html_output += f'          <p><strong>Citations:</strong> {num_citations}</p>\n'
            if 'abstract' in bib:
                html_output += f'          <p><strong>Abstract:</strong> {bib["abstract"]}</p>\n'
            else:
                html_output += f'          <p><em>Abstract not available in this view.</em></p>\n'
            html_output += f'        </div>\n'
            html_output += f'      </details>\n'

            html_output += '    </li>\n'
            
        html_output += '  </ul>\n'
        html_output += '</div>\n'
        
        return html_output

    except Exception as e:
        return f"Error fetching publications: {str(e)}"

if __name__ == "__main__":
    author_id = "sE8Q0TIAAAAJ"
    html_content = fetch_and_generate_html(author_id)
    
    with open("publications_content.html", "w") as f:
        f.write(html_content)
    
    print("HTML content generated in publications_content.html")
