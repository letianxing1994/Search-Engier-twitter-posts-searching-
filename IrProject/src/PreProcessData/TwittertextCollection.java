package PreProcessData;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import Classes.Path;

public class TwittertextCollection implements DocumentCollection{
    private BufferedReader br;
    private Map<String, Object> map;
    private String line;
    private String key;
    private StringBuilder content;
    
    public TwittertextCollection() throws IOException{
    	    //open file reader and buffer reader.
    	    line="";
    	    File f = new File(Classes.Path.twitter);
    	    BufferedInputStream bi = new BufferedInputStream(new FileInputStream(f));
        br=new BufferedReader(new InputStreamReader(bi,"utf-8"),10*1024*1024);
    }
    
    public Map<String, Object> nextDocument() throws IOException{
    	    content = new StringBuilder();
    	    map = new HashMap<>();//map used for storing doc number and doc content
    	    int index = 1;
        int begin = 0;
        while((line=br.readLine())!=null) {
        	    //record the doc number of the document
            	key = line.substring(0,line.indexOf(","));
            	//find the content of a string
            	for(int i=line.indexOf(',');i<line.length();i++) {
            	    	if(line.charAt(i)==',')
            	    	    	index++;
            	    	if(index==4) {
            	    	    	begin = i+1;
            	    	    	break;
            	    	}
            	}
            break;
        }
        
        //when no document left, return null, and close the file.
        if(line == null) {
            	br.close();
            	return null;
        }
        //record content of the text before text has been throughly read
    	    content.append(line.substring(begin, line.length()));
    	    
    	    //record doc number and doc content
    	    map.put(key, content.toString().toCharArray());
    	    return map;
    } 
}
