package Classes;

import java.util.HashMap;
import java.util.Map;

public class Filedoc {
	Map<String,String> map ;
    public Filedoc() {
    	    map=new HashMap<>();
    }
    
    public void addFile(String docno, String content) {
    	    this.map.put(docno, content);
    }
    
    public String getContent(String docno) {
    	    return this.map.get(docno);
    }
}
