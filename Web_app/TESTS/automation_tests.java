import static org.junit.Assert.*;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;

/* Referenced from: https://wunder.io/blog/creating-and-running-a-simple-selenium-webdriver-test/2011-09-15 */
public class AutomationTests {
	
	/* Global variables */
	// Use this for Firefox
	private String driver_type_gecko = "webdriver.gecko.driver";
	private String url_gecko = "/Users/aivarastumas/Desktop/geckodriver";
	
	// Use this for Chrome
	private String driver_type_chrome = "webdriver.chrome.driver";
	private String url_chrome = "/Users/aivarastumas/Desktop/chromedriver";
	
	private String url_app = "http://localhost/3rd_year_project_new/Web_app/";
	private WebDriver driver;
	private JavascriptExecutor js;

	@Before
	public void open_browser() {
		System.setProperty(driver_type_chrome, url_chrome);
	    driver = new ChromeDriver();
	    driver.get(url_app);
	    js = (JavascriptExecutor) driver;
	}
	
	@After
	public void close_browser(){
	    driver.quit();
	}
	
	@Test
	public void login() throws Exception{
    	driver.get(url_app + "index.php");
    	driver.findElement(By.id("loginUsername")).sendKeys("admin");
    	driver.findElement(By.id("loginPassword")).sendKeys("admin");
    	driver.findElement(By.id("login_button")).click();
	}
	
	@Test
	public void start_new_project() throws Exception{
		login();
    	driver.findElement(By.id("new_project")).click();
	}
	
	@Test
	public void check_new_project_values_in_javascript() throws Exception{
		start_new_project();
		
		Object username, name, layer_number, width, colour_R, colour_G, colour_B;
		username = js.executeScript("return get_layer_username();");
		name = js.executeScript("return get_layer_name();");
		layer_number = js.executeScript("return get_layer_number();");
		width = js.executeScript("return get_layer_width();");
		colour_R = js.executeScript("return get_layer_colour_R();");
		colour_G = js.executeScript("return get_layer_colour_G();");
		colour_B = js.executeScript("return get_layer_colour_B();");

    	assertEquals("admin", username);
    	assertEquals("undefined", name);
    	assertEquals(1L, layer_number);
    	assertEquals(10L, width);
    	assertEquals(200L, colour_R);
    	assertEquals(0L, colour_G);
    	assertEquals(200L, colour_B);
	}

	@Test
	public void check_new_project_values_in_UI() throws Exception{
		start_new_project();
		
	    String name, width, colour_R, colour_G, colour_B;
	    name = driver.findElement(By.id("name_input")).getAttribute("value");
		width = driver.findElement(By.xpath("//div[@id='width_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']")).getText();             
		colour_R = driver.findElement(By.xpath("//div[@id='colour_R_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']")).getText();             
		colour_G = driver.findElement(By.xpath("//div[@id='colour_G_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']")).getText();             
		colour_B = driver.findElement(By.xpath("//div[@id='colour_B_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']")).getText();             

		assertEquals("undefined", name);
		assertEquals("10", width);
		assertEquals("200", colour_R);
		assertEquals("0", colour_G);
		assertEquals("200", colour_B);
	}

	@Test
	public void change_new_project_width_in_UI() throws Exception{
		start_new_project();

	    String width;
		WebElement slider = driver.findElement(By.xpath("//div[@id='width_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		width = slider.getText();
		assertEquals("11", width);

		slide_right(slider, 5);
		width = slider.getText();
		assertEquals("16", width);

		// out of bounds - should still stay at 16
		slide_right(slider, 1);
		width = slider.getText();
		assertEquals("16", width);

		slide_left(slider, 1);
		width = slider.getText();
		assertEquals("15", width);

		slide_left(slider, 14);
		width = slider.getText();
		assertEquals("1", width);

		// out of bounds - should still stay at 1
		slide_left(slider, 1);
		width = slider.getText();
		assertEquals("1", width);
	}
	
	@Test
	public void change_new_project_red_colour_in_UI() throws Exception{
		start_new_project();

	    String colour_R;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_R_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		colour_R = slider.getText();
		assertEquals("201", colour_R);

		slide_right(slider, 54);
		colour_R = slider.getText();
		assertEquals("255", colour_R);

		// out of bounds - should still stay at 255
		slide_right(slider, 1);
		colour_R = slider.getText();
		assertEquals("255", colour_R);

		slide_left(slider, 1);
		colour_R = slider.getText();
		assertEquals("254", colour_R);

		slide_left(slider, 254);
		colour_R = slider.getText();
		assertEquals("0", colour_R);

		// out of bounds - should still stay at 0
		slide_left(slider, 1);
		colour_R = slider.getText();
		assertEquals("0", colour_R);
	}
	
	@Test
	public void change_new_project_green_colour_in_UI() throws Exception{
		start_new_project();

	    String colour_G;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_G_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		// out of bounds - should still stay at 0
		slide_left(slider, 1);
		colour_G = slider.getText();
		assertEquals("0", colour_G);
		
		slide_right(slider, 1);
		colour_G = slider.getText();
		assertEquals("1", colour_G);

		slide_right(slider, 254);
		colour_G = slider.getText();
		assertEquals("255", colour_G);

		// out of bounds - should still stay at 255
		slide_right(slider, 1);
		colour_G = slider.getText();
		assertEquals("255", colour_G);
		
		slide_left(slider, 1);
		colour_G = slider.getText();
		assertEquals("254", colour_G);
	}
	
	@Test
	public void change_new_project_blue_colour_in_UI() throws Exception{
		start_new_project();

	    String colour_B;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_B_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		colour_B = slider.getText();
		assertEquals("201", colour_B);

		slide_right(slider, 54);
		colour_B = slider.getText();
		assertEquals("255", colour_B);

		// out of bounds - should still stay at 255
		slide_right(slider, 1);
		colour_B = slider.getText();
		assertEquals("255", colour_B);

		slide_left(slider, 1);
		colour_B = slider.getText();
		assertEquals("254", colour_B);

		slide_left(slider, 254);
		colour_B = slider.getText();
		assertEquals("0", colour_B);

		// out of bounds - should still stay at 0
		slide_left(slider, 1);
		colour_B = slider.getText();
		assertEquals("0", colour_B);
	}
	
	@Test
	public void change_new_project_width_in_javascript() throws Exception{
		start_new_project();
		
		Object width;
		WebElement slider = driver.findElement(By.xpath("//div[@id='width_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(11L, width);

		slide_right(slider, 5);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(16L, width);

		// out of bounds - should still stay at 16
		slide_right(slider, 1);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(16L, width);

    	slide_left(slider, 1);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(15L, width);

    	slide_left(slider, 14);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(1L, width);

		// out of bounds - should still stay at 1
    	slide_left(slider, 1);
		width = js.executeScript("return get_layer_width();");
    	assertEquals(1L, width);
	}
	
	@Test
	public void change_new_project_red_colour_in_javascript() throws Exception{
		start_new_project();
		
		Object colour_R;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_R_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(201L, colour_R);

		slide_right(slider, 55);
		colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(255L, colour_R);

		// out of bounds - should still stay at 255
		slide_right(slider, 1);
		colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(255L, colour_R);

    	slide_left(slider, 1);
    	colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(254L, colour_R);

    	slide_left(slider, 254);
    	colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(0L, colour_R);

		// out of bounds - should still stay at 0
    	slide_left(slider, 1);
    	colour_R = js.executeScript("return get_layer_colour_R();");
    	assertEquals(0L, colour_R);
	}
	
	@Test
	public void change_new_project_green_colour_in_javascript() throws Exception{
		start_new_project();
		
		Object colour_G;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_G_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		// out of bounds - should still stay at 0
		slide_left(slider, 1);
		colour_G = js.executeScript("return get_layer_colour_G();");
    	assertEquals(0L, colour_G);

		slide_right(slider, 1);
		colour_G = js.executeScript("return get_layer_colour_G();");
    	assertEquals(1L, colour_G);

		slide_right(slider, 254);
		colour_G = js.executeScript("return get_layer_colour_G();");
    	assertEquals(255L, colour_G);

		// out of bounds - should still stay at 255
    	slide_right(slider, 1);
    	colour_G = js.executeScript("return get_layer_colour_G();");
    	assertEquals(255L, colour_G);

    	slide_left(slider, 1);
    	colour_G = js.executeScript("return get_layer_colour_G();");
    	assertEquals(254L, colour_G);
	}
	
	@Test
	public void change_new_project_blue_colour_in_javascript() throws Exception{
		start_new_project();
		
		Object colour_B;
		WebElement slider = driver.findElement(By.xpath("//div[@id='colour_B_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));

		slide_right(slider, 1);
		colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(201L, colour_B);

		slide_right(slider, 55);
		colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(255L, colour_B);

		// out of bounds - should still stay at 255
		slide_right(slider, 1);
		colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(255L, colour_B);

    	slide_left(slider, 1);
    	colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(254L, colour_B);

    	slide_left(slider, 254);
    	colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(0L, colour_B);

		// out of bounds - should still stay at 0
    	slide_left(slider, 1);
    	colour_B = js.executeScript("return get_layer_colour_B();");
    	assertEquals(0L, colour_B);
	}
	
	@Test
	public void new_project_correctly_encoding_pixels_with_no_changes() throws Exception{
		start_new_project();
		
		Object encoded_string;
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
	}
	
	@Test
	public void new_project_encoding_pixels_after_changing_width_for_different_layers() throws Exception{
		start_new_project();
		
		Object encoded_string;
		WebElement slider;

		slider = driver.findElement(By.xpath("//div[@id='width_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));
		slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,11,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
		
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,9,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);

		driver.findElement(By.id("layer_2")).click();
    	
    	slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,9,200,0,200,11,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
    	
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,9,200,0,200,9,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
	}
	
	@Test
	public void new_project_encoding_pixels_after_changing_red_colour_for_different_layers() throws Exception{
		start_new_project();
		
		Object encoded_string;
		WebElement slider;

		slider = driver.findElement(By.xpath("//div[@id='colour_R_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));
		slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,201,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
		
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,199,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);

		driver.findElement(By.id("layer_2")).click();
    	
    	slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,199,0,200,10,201,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
    	
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,199,0,200,10,199,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
	}
	
	@Test
	public void new_project_encoding_pixels_after_changing_green_colour_for_different_layers() throws Exception{
		start_new_project();
		
		Object encoded_string;
		WebElement slider;

		slider = driver.findElement(By.xpath("//div[@id='colour_G_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));
		slide_right(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,2,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
		
    	slide_left(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,1,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);

		driver.findElement(By.id("layer_2")).click();
    	
    	slide_right(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,1,200,10,200,2,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
    	
    	slide_left(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,1,200,10,200,1,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
	}
	
	@Test
	public void new_project_encoding_pixels_after_changing_blue_colour_for_different_layers() throws Exception{
		start_new_project();
		
		Object encoded_string;
		WebElement slider;

		slider = driver.findElement(By.xpath("//div[@id='colour_B_slider']/span[@class='ui-slider-handle ui-state-default ui-corner-all']"));
		slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,0,201,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
		
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,0,199,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);

		driver.findElement(By.id("layer_2")).click();
    	
    	slide_right(slider, 1);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,0,199,10,200,0,201,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
    	
    	slide_left(slider, 2);
		driver.findElement(By.id("run_button")).click();
		encoded_string = js.executeScript("return encode_pixels();");
    	assertEquals("9,10,200,0,199,10,200,0,199,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200,10,200,0,200", encoded_string);
	}
	
	@Test
	public void new_project_save_no_project_name_warning() throws Exception{
		start_new_project();
		
		Alert alert;
		String alert_message = "";
		driver.findElement(By.id("save_button_new_project")).click();
		
		if (isAlertPresent()){
			alert = driver.switchTo().alert();
			alert_message = alert.getText();
			alert.accept();
		}
		
		assertEquals("Please choose a name for the project.", alert_message);
	}

	public void new_project_save_different_name_success() throws Exception{
		start_new_project();
		
		Alert alert;
		String alert_message = "";

	    driver.findElement(By.id("name_input")).clear();
	    driver.findElement(By.id("name_input")).sendKeys("random_project_1");
		driver.findElement(By.id("save_button_new_project")).click();
		
		if (isAlertPresent()){
			alert = driver.switchTo().alert();
			alert_message = alert.getText();
			alert.accept();
		}
		
		assertEquals("Project saved.", alert_message);
	}
	
	@Test
	public void delete_project_success() throws Exception{
		new_project_save_different_name_success();

		Alert alert;
		String alert_message = "";
		WebElement delete_button;
		Boolean is_present;
		String xpath = "//div[@class='project_title' and contains(text(), 'random_project_1')]/following-sibling::div[@class='project_delete_button_holder']/img[@class='project_delete_button']";

    	driver.get(url_app + "dashboard.php");
    	
		delete_button = driver.findElement(By.xpath(xpath));             
		delete_button.click();
		
		if (isAlertPresent()){
			alert = driver.switchTo().alert();
			alert_message = alert.getText();
			alert.accept();
		}

		assertEquals("Are you sure you want to delete this project?", alert_message);
		is_present = driver.findElements(By.xpath(xpath)).size() > 0;
		assertFalse(is_present);
	}
	
	/* Helper methods */
	private void slide_right(WebElement slider, int how_many){
	    for (int i = 0; i < how_many; i++) {
	        slider.sendKeys(Keys.ARROW_RIGHT);
	    }
	}
	private void slide_left(WebElement slider, int how_many){
	    for (int i = 0; i < how_many; i++) {
	        slider.sendKeys(Keys.ARROW_LEFT);
	    }
	}
	private boolean isAlertPresent(){ 
	    try{ 
	        driver.switchTo().alert(); 
	        return true; 
	    }
	    catch (NoAlertPresentException exception){ 
	        return false; 
	    }
	}
}