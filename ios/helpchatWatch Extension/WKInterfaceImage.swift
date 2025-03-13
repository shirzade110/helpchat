import WatchKit

public extension WKInterfaceImage {

    public func setImageWithUrl(url:String) -> WKInterfaceImage? {

      DispatchQueue.global(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0).async() {
            let url:NSURL = NSURL(string:url)!
          var data:NSData = NSData(contentsOf: url as URL)!
          var placeholder = UIImage(data: data as Data)!

            dispatch_async(dispatch_get_main_queue()) {
                self.setImage(placeholder)
            }
        }

        return self
    }

}
