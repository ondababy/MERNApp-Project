class EmailTemplate {
  constructor(order) {
    this.order = order;
  }

  styles() {
    return `
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
        background-color: #007bff;
        color: #ffffff;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        padding: 10px 0;
        background-color: #f4f4f4;
        color: #777777;
      }
      .order-summary {
        margin-top: 20px;
      }
      .order-summary h3 {
        margin-bottom: 10px;
        color: #007bff;
      }
      .order-summary ul {
        list-style-type: none;
        padding: 0;
      }
      .order-summary ul li {
        padding: 5px 0;
        border-bottom: 1px solid #f4f4f4;
      }
      .order-summary p {
        margin: 10px 0;
        font-weight: bold;
      }
    `;
  }

  generate() {
    const { order } = this;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${this.styles()}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Thank you for your order!</p>
            <div class="order-summary">
              <h3>Order Summary</h3>
              <ul>
                ${order.products.map((product) => `
                  <li>
                    ${product.quantity} x ${product.name} - $${product.price}
                  </li>
                `).join('')}
              </ul>
              <p>
                Subtotal: $${order.subtotal}
              </p>
              <p>
                Shipping: $${order.shipping.fee}  
              </p>
              <p>
                Total: $${order.total}  
              </p>
            </div>
          </div>
          <div class="footer">
            <p>If you have any questions, please contact us at support@example.com.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default EmailTemplate;