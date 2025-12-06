from scholarly import scholarly
import difflib
import re

def normalize_title(title):
    """Normalize title for comparison: lowercase, remove non-alphanumeric, strip whitespace."""
    # Convert to lowercase
    title = title.lower()
    # Remove citation or arXiv prefixes if present in title (rare but possible)
    # Be more aggressive: alphanumeric only
    return "".join(c for c in title if c.isalnum())

def get_year(pub):
    """Safely get year as integer."""
    try:
        return int(pub['bib'].get('pub_year', 0))
    except:
        return 0

def fetch_and_generate_html(author_id):
    try:
        print(f"Fetching author with ID: {author_id}")
        author = scholarly.search_author_id(author_id)
        # Verify it's the right author if possible, or just accept
        print(f"Author found: {author.get('name', 'Unknown')}")
        
        print("Filling publications...")
        author = scholarly.fill(author, sections=['publications'])
        raw_pubs = author.get('publications', [])
        print(f"Fetched {len(raw_pubs)} raw publications.")

        # 1. Processing and Deduplication
        # Strategy: Map normalized title -> Best Publication Entry
        # "Best" means: Has Year > Has Venue > Has Citations
        
        unique_pubs_map = {}
        
        for pub in raw_pubs:
            bib = pub['bib']
            title = bib.get('title', 'Untitled')
            norm_title = normalize_title(title)
            
            # Skip empty titles
            if not norm_title:
                continue
                
            seen_pub = unique_pubs_map.get(norm_title)
            
            if not seen_pub:
                unique_pubs_map[norm_title] = pub
            else:
                # Compare and keep the better one
                seen_bib = seen_pub['bib']
                
                # Metric 1: Year availability
                seen_year = get_year(seen_pub)
                new_year = get_year(pub)
                
                if new_year > 0 and seen_year == 0:
                    unique_pubs_map[norm_title] = pub
                    continue
                elif seen_year > 0 and new_year == 0:
                    continue # Keep existing
                
                # Metric 2: Venue/Citation availability
                seen_venue = seen_bib.get('venue') or seen_bib.get('citation') or ''
                new_venue = bib.get('venue') or bib.get('citation') or ''
                
                if new_venue and not seen_venue:
                    unique_pubs_map[norm_title] = pub
                    continue
                elif seen_venue and not new_venue:
                    continue
                
                # Metric 3: Title formatting (Mixed case vs All Caps)
                # Heuristic: More lowercase letters is usually better
                seen_lower_count = sum(1 for c in seen_bib.get('title', '') if c.islower())
                new_lower_count = sum(1 for c in title if c.islower())
                
                if new_lower_count > seen_lower_count:
                    unique_pubs_map[norm_title] = pub

        # Convert back to list
        processed_pubs = list(unique_pubs_map.values())
        print(f"Reduced to {len(processed_pubs)} unique publications.")
        
        # 2. Sorting
        # Primary: Year (Descending), Secondary: Citations (Descending), Tertiary: Title
        processed_pubs.sort(key=lambda x: (
            get_year(x), 
            x.get('num_citations', 0), 
            x['bib'].get('title', '').strip().lower()
        ), reverse=True)

        # 3. HTML Generation
        html_output = '<div class="publications-list">\n'
        current_year = None
        
        for pub in processed_pubs:
            bib = pub['bib']
            title = bib.get('title', 'Untitled')
            year = get_year(pub)
            
            # Year Header
            display_year = str(year) if year > 0 else "Unknown Year"
            
            if display_year != current_year:
                if current_year is not None:
                    html_output += '  </ul>\n'
                html_output += f'  <h3 class="year-header">{display_year}</h3>\n'
                html_output += '  <ul class="publication-year-list">\n'
                current_year = display_year
            
            # Content
            pub_url = pub.get('pub_url', '')
            
            html_output += '    <li class="publication-item">\n'
            
            # Title Link
            if pub_url:
                html_output += f'      <a href="{pub_url}" target="_blank" class="publication-title">{title}</a>\n'
            else:
                html_output += f'      <span class="publication-title">{title}</span>\n'
            
            # Meta: Venue / Citation
            # Prefer 'venue', fall back to 'citation'
            venue = bib.get('venue')
            citation = bib.get('citation')
            meta_text = ""
            
            if venue:
                meta_text = venue
            elif citation and citation != 'N/A':
                meta_text = citation
            
            if meta_text:
                html_output += f'      <div class="publication-meta">\n'
                html_output += f'        <span class="publication-venue">{meta_text}</span>\n'
                html_output += f'      </div>\n'
            
            # Details / Abstract
            num_citations = pub.get('num_citations', 0)
            abstract = bib.get('abstract', '')
            
            html_output += f'      <details class="publication-details">\n'
            html_output += f'        <summary class="publication-summary">Show Details (Citations: {num_citations})</summary>\n'
            html_output += f'        <div class="publication-abstract">\n'
            html_output += f'          <p><strong>Citations:</strong> {num_citations}</p>\n'
            if abstract:
                 html_output += f'          <p><strong>Abstract:</strong> {abstract}</p>\n'
            else:
                 html_output += f'          <p><em>Abstract not available in this view.</em></p>\n'
            html_output += f'        </div>\n'
            html_output += f'      </details>\n'
            html_output += '    </li>\n'

        html_output += '  </ul>\n'
        html_output += '</div>\n'
        
        return html_output
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Error: {str(e)}"

if __name__ == "__main__":
    author_id = "sE8Q0TIAAAAJ"
    html_content = fetch_and_generate_html(author_id)
    with open("publications_content.html", "w") as f:
        f.write(html_content)
    print("Content generated.")
