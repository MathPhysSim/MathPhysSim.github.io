def update_page():
    try:
        print("Reading files...")
        with open('publications.html', 'r') as f:
            full_html = f.read()
            
        with open('publications_content.html', 'r') as f:
            new_list_content = f.read()
            
        # Hard Reset Strategy
        # 1. Find the last <hr> in the header section (it's around line 220)
        # We'll split by <hr> and take the first part.
        
        split_marker = '<hr>'
        if split_marker not in full_html:
            print("CRITICAL: <hr> marker not found. Cannot proceed with hard reset.")
            return

        parts = full_html.split(split_marker)
        header = parts[0] + split_marker + "\n"
        
        # 2. Define the footer.
        # We know we have 5 open divs from the header that need closing:
        # content-container, content, content-table, flex-row, flex-item
        # Plus we want to keep the scripts at the bottom.
        
        # Let's extract the scripts part from the END of the original file.
        # We look for </body> and take everything before it that looks like the script block, 
        # OR we just hardcode the closing divs and the known script block if it's constant.
        # The script block in the viewed file (lines 5542-5555) was commented out code.
        # But lines 41-45 loaded some JS files.
        # The footer is just closing tags and </body></html>.
        
        # Let's try to find "<!--" starting the commented out script at the end?
        # Or simpler: The file structure ends with </body></html>.
        # We can just append the closing divs and </body></html>.
        
        closing_divs = "            </div>\n" * 5
        
        footer_scripts = """
  <!--
  The script below, which loaded publicationlist.html, is now commented out
  as we are trying to use an iframe instead.
  <script defer>
    $(function(){
      // Consider adding error handling for the load function
      $("#includedContent").load("publicationlist.html", function(response, status, xhr) {
        if (status == "error") {
          $("#includedContent").html("<p class='text error-message'>Sorry, couldn't load publications at this time. Please try again later or check the scholar profiles linked above.</p>");
        }
      });
    });
  </script>
  -->
</body>

</html>"""

        new_full_html = header + new_list_content + "\n" + closing_divs + footer_scripts
        
        with open('publications.html', 'w') as f:
            f.write(new_full_html)
            
        print("Successfully performed hard reset of publications.html")

    except Exception as e:
        print(f"Error updating page: {e}")

if __name__ == "__main__":
    update_page()
